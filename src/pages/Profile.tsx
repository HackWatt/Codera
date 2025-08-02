// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../contexts/AuthContext';
// import { usersAPI } from '../services/api';
// import { Trophy, Star, Calendar, Code, Target, Medal } from 'lucide-react';
// import toast from 'react-hot-toast';

// interface ProfileUser {
//   _id: string;
//   username: string;
//   bio: string;
//   avatar: string;
//   stats: {
//     totalSolved: number;
//     easySolved: number;
//     mediumSolved: number;
//     hardSolved: number;
//     arenaWins: number;
//     arenaLosses: number;
//     totalSubmissions: number;
//     rating: number;
//   };
//   achievements: Array<{
//     type: string;
//     title: string;
//     description: string;
//     icon: string;
//     earnedAt: string;
//   }>;
//   solvedProblems: Array<{
//     problem: {
//       title: string;
//       slug: string;
//       difficulty: string;
//     };
//     solvedAt: string;
//   }>;
//   createdAt: string;
// }

// export const Profile: React.FC = () => {
//   const { userId } = useParams<{ userId?: string }>();
//   const { user: currentUser } = useAuth();
//   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     bio: '',
//     avatar: ''
//   });

//   const isOwnProfile = !userId || userId === currentUser?.id;

//   useEffect(() => {
//     if (isOwnProfile && currentUser) {
//       setProfileUser(currentUser as any);
//       setEditForm({
//         bio: currentUser.bio || '',
//         avatar: currentUser.avatar || ''
//       });
//       setLoading(false);
//     } else if (userId) {
//       fetchUserProfile(userId);
//     }
//   }, [userId, currentUser, isOwnProfile]);

//   const fetchUserProfile = async (id: string) => {
//     try {
//       setLoading(true);
//       const response = await usersAPI.getProfile(id);
//       setProfileUser(response.data.user);
//     } catch (error) {
//       toast.error('Failed to fetch user profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveProfile = async () => {
//     try {
//       await usersAPI.updateProfile(editForm);
//       setProfileUser(prev => prev ? { ...prev, ...editForm } : null);
//       setEditing(false);
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Easy':
//         return 'text-green-400';
//       case 'Medium':
//         return 'text-yellow-400';
//       case 'Hard':
//         return 'text-red-400';
//       default:
//         return 'text-gray-400';
//     }
//   };

//   const getAchievementIcon = (type: string) => {
//     switch (type) {
//       case 'first_solve':
//         return <Star className="h-6 w-6" />;
//       case 'arena_winner':
//         return <Trophy className="h-6 w-6" />;
//       case 'streak_master':
//         return <Target className="h-6 w-6" />;
//       default:
//         return <Medal className="h-6 w-6" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!profileUser) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold text-white mb-4">User not found</h1>
//         <p className="text-gray-400">The user you're looking for doesn't exist.</p>
//       </div>
//     );
//   }

//   const winRate = profileUser.stats.arenaWins + profileUser.stats.arenaLosses > 0
//     ? Math.round((profileUser.stats.arenaWins / (profileUser.stats.arenaWins + profileUser.stats.arenaLosses)) * 100)
//     : 0;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="space-y-8"
//       >
//         {/* Profile Header */}
//         <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
//           <div className="flex items-start space-x-6">
//             <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-3xl">
//                 {profileUser.username[0].toUpperCase()}
//               </span>
//             </div>
            
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-white mb-2">{profileUser.username}</h1>
//                   <div className="flex items-center space-x-4 text-sm text-gray-400">
//                     <span className="flex items-center space-x-1">
//                       <Calendar className="h-4 w-4" />
//                       <span>Joined {new Date(profileUser.createdAt).toLocaleDateString()}</span>
//                     </span>
//                     <span>Rating: {profileUser.stats.rating}</span>
//                   </div>
//                 </div>
                
        //         {isOwnProfile && (
        //           <button
        //             onClick={() => setEditing(!editing)}
        //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        //           >
        //             {editing ? 'Cancel' : 'Edit Profile'}
        //           </button>
        //         )}
        //       </div>

        //       {editing ? (
        //         <div className="space-y-4">
        //           <div>
        //             <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
        //             <textarea
        //               value={editForm.bio}
        //               onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
        //               className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        //               rows={3}
        //               placeholder="Tell us about yourself..."
        //             />
        //           </div>
        //           <div className="flex space-x-2">
        //             <button
        //               onClick={handleSaveProfile}
        //               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        //             >
        //               Save Changes
        //             </button>
        //             <button
        //               onClick={() => setEditing(false)}
        //               className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        //             >
        //               Cancel
        //             </button>
        //           </div>
        //         </div>
        //       ) : (
        //         <p className="text-gray-300">
        //           {profileUser.bio || 'No bio provided'}
        //         </p>
        //       )}
        //     </div>
        //   </div>
        // </div>

        // {/* Stats Grid */}
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        //   <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        //     <div className="flex items-center space-x-3 mb-2">
        //       <Code className="h-6 w-6 text-blue-400" />
        //       <h3 className="text-lg font-semibold text-white">Problems Solved</h3>
        //     </div>
        //     <p className="text-3xl font-bold text-white">{profileUser.stats.totalSolved}</p>
        //     <div className="mt-2 space-y-1">
        //       <div className="flex justify-between text-sm">
        //         <span className="text-green-400">Easy</span>
        //         <span className="text-gray-300">{profileUser.stats.easySolved}</span>
        //       </div>
        //       <div className="flex justify-between text-sm">
        //         <span className="text-yellow-400">Medium</span>
        //         <span className="text-gray-300">{profileUser.stats.mediumSolved}</span>
        //       </div>
        //       <div className="flex justify-between text-sm">
        //         <span className="text-red-400">Hard</span>
        //         <span className="text-gray-300">{profileUser.stats.hardSolved}</span>
        //       </div>
        //     </div>
        //   </div>

        //   <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        //     <div className="flex items-center space-x-3 mb-2">
        //       <Trophy className="h-6 w-6 text-yellow-400" />
        //       <h3 className="text-lg font-semibold text-white">Arena Stats</h3>
        //     </div>
        //     <p className="text-3xl font-bold text-white">{winRate}%</p>
        //     <div className="mt-2 space-y-1">
        //       <div className="flex justify-between text-sm">
        //         <span className="text-green-400">Wins</span>
        //         <span className="text-gray-300">{profileUser.stats.arenaWins}</span>
        //       </div>
        //       <div className="flex justify-between text-sm">
        //         <span className="text-red-400">Losses</span>
        //         <span className="text-gray-300">{profileUser.stats.arenaLosses}</span>
        //       </div>
        //     </div>
        //   </div>

        //   <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        //     <div className="flex items-center space-x-3 mb-2">
        //       <Star className="h-6 w-6 text-purple-400" />
        //       <h3 className="text-lg font-semibold text-white">Rating</h3>
        //     </div>
        //     <p className="text-3xl font-bold text-white">{profileUser.stats.rating}</p>
        //     <p className="text-sm text-gray-400 mt-2">Current Rating</p>
        //   </div>

        //   <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        //     <div className="flex items-center space-x-3 mb-2">
        //       <Code className="h-6 w-6 text-green-400" />
        //       <h3 className="text-lg font-semibold text-white">Submissions</h3>
        //     </div>
        //     <p className="text-3xl font-bold text-white">{profileUser.stats.totalSubmissions}</p>
        //     <p className="text-sm text-gray-400 mt-2">Total Submissions</p>
        //   </div>
        // </div>

        {/* Achievements */}
        // {profileUser.achievements && profileUser.achievements.length > 0 && (
        //   <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        //     <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //       {profileUser.achievements.map((achievement, index) => (
        //         <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4">
        //           <div className="text-yellow-400">
        //             {getAchievementIcon(achievement.type)}
        //           </div>
        //           <div>
        //             <h3 className="text-white font-semibold">{achievement.title}</h3>
        //             <p className="text-gray-400 text-sm">{achievement.description}</p>
        //             <p className="text-gray-500 text-xs mt-1">
        //               Earned {new Date(achievement.earnedAt).toLocaleDateString()}
        //             </p>
        //           </div>
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // )}

        {/* Recent Submissions */}
//         {profileUser.solvedProblems && profileUser.solvedProblems.length > 0 && (
//           <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//             <h2 className="text-2xl font-bold text-white mb-6">Recent Submissions</h2>
//             <div className="space-y-4">
//               {profileUser.solvedProblems.slice(0, 10).map((solved, index) => (
//                 <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                     <div>
//                       <h3 className="text-white font-medium">{solved.problem.title}</h3>
//                       <p className="text-gray-400 text-sm">
//                         Solved {new Date(solved.solvedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(solved.problem.difficulty)}`}>
//                     {solved.problem.difficulty}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../services/api';
import { Trophy, Star, Calendar, Code, Target, Medal, Flame, ChevronRight, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfileUser {
  _id: string;
  username: string;
  bio: string;
  avatar: string;
  stats: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    arenaWins: number;
    arenaLosses: number;
    totalSubmissions: number;
    rating: number;
    currentStreak: number;
    longestStreak: number;
    submissionCalendar: Record<string, number>;
  };
  achievements: Array<{
    type: string;
    title: string;
    description: string;
    icon: string;
    earnedAt: string;
  }>;
  solvedProblems: Array<{
    problem: {
      title: string;
      slug: string;
      difficulty: string;
    };
    solvedAt: string;
  }>;
  createdAt: string;
}

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: '',
    avatar: ''
  });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const isOwnProfile = !userId || userId === currentUser?.id;

  useEffect(() => {
    if (isOwnProfile && currentUser) {
      setProfileUser(currentUser as any);
      setEditForm({
        bio: currentUser.bio || '',
        avatar: currentUser.avatar || ''
      });
      setLoading(false);
    } else if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId, currentUser, isOwnProfile]);

  const fetchUserProfile = async (id: string) => {
    try {
      setLoading(true);
      const response = await usersAPI.getProfile(id);
      setProfileUser(response.data.user);
    } catch (error) {
      toast.error('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await usersAPI.updateProfile(editForm);
      setProfileUser(prev => prev ? { ...prev, ...editForm } : null);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'first_solve':
        return <Star className="h-6 w-6" />;
      case 'arena_winner':
        return <Trophy className="h-6 w-6" />;
      case 'streak_master':
        return <Target className="h-6 w-6" />;
      default:
        return <Medal className="h-6 w-6" />;
    }
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderSubmissionCalendar = () => {
    if (!profileUser?.stats.submissionCalendar) return null;

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // Create calendar grid
    const weeks = [];
    let currentWeek = Array(firstDayOfMonth).fill(null);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const submissions = profileUser.stats.submissionCalendar[dateStr] || 0;
      
      currentWeek.push({
        day,
        submissions
      });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    const getHeatColor = (count: number) => {
      if (count === 0) return 'bg-gray-800';
      if (count < 3) return 'bg-green-600';
      if (count < 5) return 'bg-green-500';
      return 'bg-green-400';
    };

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Submission Calendar</h3>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => changeMonth('prev')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft />
            </button>
            <span className="text-white font-medium">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={() => changeMonth('next')}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-gray-400">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div key={dayIndex} className="aspect-square">
                  {day ? (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`h-full rounded-sm ${getHeatColor(day.submissions)} flex items-center justify-center text-xs`}
                      title={`${day.submissions} submissions on ${currentMonth+1}/${day.day}/${currentYear}`}
                    >
                      {day.submissions > 0 && (
                        <span className="text-white font-medium">{day.submissions}</span>
                      )}
                    </motion.div>
                  ) : (
                    <div className="h-full bg-gray-900 rounded-sm opacity-50"></div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">User not found</h1>
        <p className="text-gray-400">The user you're looking for doesn't exist.</p>
      </div>
    );
  }

  const winRate = profileUser.stats.arenaWins + profileUser.stats.arenaLosses > 0
    ? Math.round((profileUser.stats.arenaWins / (profileUser.stats.arenaWins + profileUser.stats.arenaLosses)) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {profileUser.username[0].toUpperCase()}
                </span>
              </div>
              {isOwnProfile && profileUser.stats.currentStreak > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full p-1 flex items-center justify-center shadow-lg"
                >
                  <div className="flex items-center px-2 py-1">
                    <Flame className="h-4 w-4" />
                    <span className="ml-1 text-xs font-bold">{profileUser.stats.currentStreak}</span>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileUser.username}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(profileUser.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span>Rating: {profileUser.stats.rating}</span>
                    {profileUser.stats.currentStreak > 0 && (
                      <span className="flex items-center space-x-1 text-orange-400">
                        <Flame className="h-4 w-4" />
                        <span>{profileUser.stats.currentStreak} day streak</span>
                      </span>
                    )}
                  </div>
                </div>
                
                {isOwnProfile && (
                  <button
                    onClick={() => setEditing(!editing)}
                    className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {editing ? 'Cancel' : 'Edit Profile'}
                  </button>
                )}
              </div>

              {editing ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveProfile}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEditing(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <p className="text-gray-300 mt-4">{profileUser.bio || "This user hasn't written a bio yet."}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Problems Solved</h3>
              <Code className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{profileUser.stats.totalSolved}</p>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span className="text-green-400">Easy: {profileUser.stats.easySolved}</span>
              <span className="text-yellow-400">Medium: {profileUser.stats.mediumSolved}</span>
              <span className="text-red-400">Hard: {profileUser.stats.hardSolved}</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Current Streak</h3>
              <Flame className="h-6 w-6 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{profileUser.stats.currentStreak} days</p>
            <p className="text-sm text-gray-400 mt-2">Longest streak: {profileUser.stats.longestStreak} days</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Arena Battles</h3>
              <Trophy className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{profileUser.stats.arenaWins}W / {profileUser.stats.arenaLosses}L</p>
            <p className="text-sm text-gray-400 mt-2">Win rate: {winRate}%</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Submissions</h3>
              <Target className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{profileUser.stats.totalSubmissions}</p>
            <p className="text-sm text-gray-400 mt-2">All-time submissions</p>
          </motion.div>
        </div>

        {/* Submission Calendar */}
        {renderSubmissionCalendar()}

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          
          {profileUser.solvedProblems.length > 0 ? (
            <div className="space-y-4">
              {profileUser.solvedProblems.slice(0, 5).map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <div>
                    <h4 className={`font-medium ${getDifficultyColor(problem.problem.difficulty)}`}>
                      {problem.problem.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Solved on {new Date(problem.solvedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.problem.difficulty)} bg-opacity-20 ${problem.problem.difficulty === 'Easy' ? 'bg-green-400' : problem.problem.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'}`}>
                    {problem.problem.difficulty}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No recent activity yet</p>
          )}
        </div>

        {/* Achievements */}
        {profileUser.achievements.length > 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileUser.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg border border-gray-600"
                >
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    {getAchievementIcon(achievement.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};