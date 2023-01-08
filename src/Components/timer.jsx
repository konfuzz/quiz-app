import React, { useState, useEffect } from 'react';

const Timer = ({ ready, reset, current, setCurrent, }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [ready]);

  useEffect(() => {
    if (reset) {
      setSeconds(0);
    }
  }, [reset]);

  useEffect(() => {
    if (seconds === 20) {
      setCurrent(current + 1);
      setSeconds(0);
    }
  }, [seconds, current, setCurrent]);

  return (
    <div className="timer" style={{ position: "absolute", right: "25px", top: "25px" }}>
      {seconds}
    </div>
  );
}

export default Timer;