'use client';

import { useState, useEffect } from 'react';

interface SlackChannel {
  id: string;
  name: string;
}

export function AdminPanel() {
  const [slackChannels, setSlackChannels] = useState<SlackChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [notionDatabaseId, setNotionDatabaseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch Slack channels on component mount
  useEffect(() => {
    fetchSlackChannels();
  }, []);

  const fetchSlackChannels = async () => {
    try {
      const response = await fetch('/api/slack/channels');
      if (response.ok) {
        const channels = await response.json();
        setSlackChannels(channels);
      }
    } catch (error) {
      console.error('Error fetching Slack channels:', error);
    }
  };

  const handleSlackIngestion = async () => {
    if (!selectedChannel || !workspaceId) {
      setMessage('Please select a channel and enter workspace ID');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/ingest/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelId: selectedChannel,
          workspaceId,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to ingest Slack messages');
      console.error('Slack ingestion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotionIngestion = async () => {
    if (!workspaceId) {
      setMessage('Please enter workspace ID');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/ingest/notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspaceId,
          databaseId: notionDatabaseId || undefined,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to ingest Notion pages');
      console.error('Notion ingestion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
        <p className="text-gray-600">Configure and ingest data from your integrations</p>
      </div>

      {/* Slack Integration */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">💬</span>
          <h3 className="text-lg font-semibold text-gray-900">Slack Integration</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace ID
            </label>
            <input
              type="text"
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              placeholder="Enter your workspace ID (e.g., T1234567890)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel (Select or Enter Manually)
            </label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            >
              <option value="">Select a channel...</option>
              {slackChannels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  #{channel.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or enter channel ID manually (e.g., C1234567890)"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              If channel list is empty, enter a channel ID manually (starts with C)
            </p>
          </div>

          <button
            onClick={handleSlackIngestion}
            disabled={isLoading || !selectedChannel || !workspaceId}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Ingesting...' : 'Ingest Slack Messages'}
          </button>
        </div>
      </div>

      {/* Notion Integration */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">📝</span>
          <h3 className="text-lg font-semibold text-gray-900">Notion Integration</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace ID
            </label>
            <input
              type="text"
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              placeholder="Enter your workspace ID (same as Slack)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Database ID (Optional)
            </label>
            <input
              type="text"
              value={notionDatabaseId}
              onChange={(e) => setNotionDatabaseId(e.target.value)}
              placeholder="Leave empty to ingest all accessible pages"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              If left empty, will ingest all pages you have access to
            </p>
          </div>

          <button
            onClick={handleNotionIngestion}
            disabled={isLoading || !workspaceId}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Ingesting...' : 'Ingest Notion Pages'}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.startsWith('✅') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Setup Instructions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Setup Instructions</h4>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <strong>1. Environment Variables:</strong> Make sure to set up your API keys in the environment variables file.
          </div>
          <div>
            <strong>2. Slack Setup:</strong> Create a Slack app and install it to your workspace. Get the bot token from OAuth & Permissions.
          </div>
          <div>
            <strong>3. Notion Setup:</strong> Create a Notion integration and share your pages/databases with it.
          </div>
          <div>
            <strong>4. Database:</strong> Make sure your Supabase database has the knowledge_items table with pgvector extension enabled.
          </div>
        </div>
      </div>
    </div>
  );
}
