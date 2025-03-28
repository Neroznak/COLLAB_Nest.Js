# Collabster

## 1. Project Overview
Collabster is a collaborative problem-solving platform that enables real-time teamwork on coding tasks. The application allows users to join or create collaborative rooms, work on coding problems together, and share live feedback and results. The platform uses cutting-edge technologies to provide a seamless and efficient user experience, with strong emphasis on error handling and security.

## 2. Features
- **Real-time collaboration**: Multiple users can join a room and work on coding tasks simultaneously, seeing each other’s changes in real-time.
- **Task-solving engine**: Provides an environment for users to solve coding problems with a variety of tools and languages.
- **Isolated environments**: Each user’s code execution is isolated using `isolated-vm` to ensure security and prevent conflicts.
- **JWT Authentication**: Secure user authentication using JWT tokens.
- **Robust error handling**: Advanced error handling mechanisms to provide users with real-time feedback on their code and assist in debugging.
- **User management**: Users can create rooms, join existing ones, and manage their profiles and preferences.
- **Real-time notifications**: Users receive notifications when someone joins the room or submits a solution.

## 3. Technologies and Tools
- **Backend**: 
  - Nest.js (for building server-side logic)
  - Prisma (for database interaction and data modeling)
  - JWT (for secure token-based authentication)
  - Isolated-vm (for running user code in isolated environments)
- **Database**: PostgreSQL (using Prisma ORM)
- **WebSocket**: For real-time communication between users.
  
## 4. Demo
Collabster is a collaborative coding platform designed for real-time team problem-solving. Users can join coding rooms, work on problems together, and get live feedback on their solutions. Each user's environment is securely isolated to prevent interference. The app integrates real-time messaging and notifications, ensuring a smooth collaborative experience.
   
