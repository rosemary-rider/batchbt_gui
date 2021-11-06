import React, { useState, useEffect } from 'react'
import useFetch, { CachePolicies } from 'use-http'
import { API_URL } from './api'
import { log } from './log'

interface Props {
  jobKeys: string[]
  onClick: () => void;
}

export const KillButton: React.FC<Props> = ({ jobKeys, onClick }) => {
  const [keys, setKeys] = useState<string[]>([])
  return (
    <>
      <button
        className="btn btn-outline-primary"
        disabled={keys.length > 0 ? true : false}
        onClick={() => {
          setKeys([...jobKeys]);
          onClick();
        }}>
        Kill
      </button>
      {keys.map(jobKey => (
        <KillJob
          key={jobKey}
          jobKey={jobKey}
          onLoaded={() => setKeys(keys.filter(key => key !== jobKey))}
        />))}
    </>
  )
}

interface KillJobProps {
  jobKey: string;
  onLoaded: () => void;
}

const KillJob: React.FC<KillJobProps> = ({ jobKey, onLoaded }) => {
  const { loading, error, data } = useFetch(`${API_URL}/jobs/${jobKey}/kill`, { method: 'PUT', cachePolicy: CachePolicies.NO_CACHE }, [])
  useEffect(() => {
    if (loading) return;
    log({ msg: 'kill job', jobKey, data, error })
    onLoaded();
  }, [loading, onLoaded, jobKey, data, error])
  return null;
}
