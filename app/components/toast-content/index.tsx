import React from 'react';

const ToastContent = ({type, message}: {type: string, message: string}) => {

  const bgColor = type == "error" ? "bg-red-300" : "bg-green-300";

  return (
    <div
      className={`max-w-md w-full ${bgColor} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ToastContent;