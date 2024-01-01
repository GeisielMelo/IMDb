import React, { useEffect, useRef } from 'react';

interface CircularProgressBarProps {
  progressPercentage: number;
  animationDuration: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progressPercentage, animationDuration }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40;
    const progress = (progressPercentage / 100) * 2 * Math.PI;

    const startAngle = -Math.PI / 2;
    let currentAngle = startAngle;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progressTime = timestamp - startTime;
      const progressRatio = Math.min(progressTime / animationDuration, 1);
      currentAngle = startAngle + progressRatio * progress;

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.strokeStyle = 'lightgray';
      context.lineWidth = 8;
      context.stroke();

      context.beginPath();
      context.arc(centerX, centerY, radius, startAngle, currentAngle);
      context.strokeStyle = 'green';
      context.lineWidth = 8;
      context.stroke();

      context.font = '17px Arial';
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(`${progressPercentage}%`, centerX, centerY);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progressPercentage, animationDuration]);

  return (
    <div className='max-w-[100px] max-h-[100px]'>
      <canvas ref={canvasRef} width={100} height={100} className='w-full h-full' />
    </div>
  );
};

export default CircularProgressBar;
