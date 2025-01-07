const UsersList = () => {
  const users = [
    {
      id: 1,
      userName: "john_doe",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      userName: "jane_smith",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      userName: "developer_123",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      userName: "web_designer",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      userName: "data_guru",
      profileImage: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="max-w-fit">
      <h2 className="users-and-category-Heading">Users</h2>
      <ul className="flex md:flex-col items-center py-1">
        {users.map((user) => (
          <li
            key={user.id}
            className="w-full my-1 text-center py-3 px-5 rounded-lg mx-2 font-semibold border"
          >
            <div className="flex items-center py-1 justify-start">
              <img
                src={user.profileImage}
                alt={user.userName}
                className="w-10 h-10 rounded-full border"
              />
              <span className="flex-1">{user.userName}</span>
            </div>
            <div className="bg-blue-700 text-white py-1 px-3 rounded-lg hover:bg-blue-800 transition-colors">
              Follow
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
