const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <p className="text-lg text-gray-700 mb-4">Welcome to your profile!</p>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Username:</span>
            <span>your_username</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>your_email@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
