import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditProfile from './editProfileTap';
import ProfileTap from './profileTap';
import ChangePass from './changePassTap';

const tabs = [
  { id: 0, title: 'Hồ sơ' },
  { id: 1, title: 'Thay đổi thông tin' },
  { id: 2, title: 'Đổi mật khẩu' },
];

const Profile = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(
    location.state?.chooseTab ?? 0,
  );

  // Nếu navigate đến profile với state.chooseTab thì auto chuyển tab
  React.useEffect(() => {
    if (location.state?.chooseTab !== undefined) {
      setActiveTab(location.state.chooseTab);
    }
  }, [location.state]);

  return (
    <div>
      {/* ── Tab Header ───────────────────────────────────────── */}
      <div className="mt-2 h-10 flex px-4 justify-around items-center cursor-pointer border-b border-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="w-[30%] h-full flex flex-col items-center justify-center rounded-t-md transition-colors duration-200"
            style={{
              backgroundColor: activeTab === tab.id ? '#2999ff' : '#fff',
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <p
              className="text-base font-bold select-none"
              style={{ color: activeTab === tab.id ? '#fff' : 'black' }}
            >
              {tab.title}
            </p>
          </div>
        ))}
      </div>

      {/* ── Tab Content ──────────────────────────────────────── */}
      <div className="pt-4">
        {activeTab === 0 && <ProfileTap />}
        {activeTab === 1 && <EditProfile />}
        {activeTab === 2 && <ChangePass />}
      </div>
    </div>
  );
};

export default Profile;
