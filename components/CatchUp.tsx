import React, { useEffect, useState } from "react";
import styles from "./CatchUp.module.css";

interface Props {
  includeDetails?: Boolean;
}

const CatchUp: React.FC<Props> = ({ includeDetails = true }: Props) => {
  const [status, setStatus] = useState({});
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/catchup");
      const json = await resp.json();
      setStatus(json);
      setLastUpdate(new Date());
    })();
  }, []);
  return (
    <div className={styles.wrapper}>
      <p>
        <strong>Last Update</strong>:{" "}
        {lastUpdate ? lastUpdate.toLocaleTimeString() : "none"}
      </p>
      {includeDetails && (
        <p>
          <strong>Response</strong>: {JSON.stringify(status, null, 2)}
        </p>
      )}
    </div>
  );
};

export default CatchUp;
