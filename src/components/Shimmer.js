const Shimmer = () => {
    return (
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="w-64 h-80 bg-gray-200 rounded-lg overflow-hidden">
              <div className="animate-pulse flex flex-col justify-between h-full p-4">
                <div className="bg-gray-300 h-40 w-full rounded-md"></div>
                <div className="space-y-4 mt-4">
                  <div className="bg-gray-300 h-6 w-3/4 rounded-md"></div>
                  <div className="bg-gray-300 h-6 w-1/2 rounded-md"></div>
                  <div className="bg-gray-300 h-6 w-2/3 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Shimmer;
  