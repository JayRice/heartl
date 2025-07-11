
interface Props{
    handleLogout: () => void;
}
export default function ProfileTab({handleLogout}: Props) {

    return (
        <div className="flex-1 p-4 max-w-md mx-auto w-full">
            <div className="text-center">
                <img
                    src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">Your Profile</h2>
                <p className="text-gray-400 mb-8">Manage your profile and settings</p>

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-colors"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}