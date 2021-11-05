import React, { useState, useEffect } from 'react'
import useFetch from 'use-http'
import { API_URL } from './api'
import { log } from './log'

interface Props {
  jobKeys: string[]
}

export const KillButton: React.FC<Props> = ({ jobKeys }) => {
  const [runningCount, setRunningCount] = useState(0)
  return (
    <>
      <button className="btn btn-outline-primary" disabled={runningCount > 0} onClick={() => setRunningCount(jobKeys.length)}>Kill</button>
      {runningCount > 0 && jobKeys.map(jobKey => <KillJob key={jobKey} jobKey={jobKey} onLoaded={() => setRunningCount(runningCount - 1)} />)}
    </>
  )
}

interface KillJobProps {
  jobKey: string;
  onLoaded: () => void;
}

const KillJob: React.FC<KillJobProps> = ({ jobKey, onLoaded }) => {
  const { loading, error, data } = useFetch(`${API_URL}/jobs/${jobKey}/kill`, { method: 'PUT' }, [])
  useEffect(() => {
    if (loading) {
      log({ msg: 'kill job start', jobKey })
      return;
    }
    log({ msg: 'kill job stop', jobKey, data, error })
    onLoaded()
  }, [jobKey, onLoaded, loading, error, data])
  return null;
}
