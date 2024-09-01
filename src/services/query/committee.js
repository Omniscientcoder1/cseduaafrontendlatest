import endpoints from 'src/constants/endpoints';
import { axios, privateAxios } from '../request/axiosConfig';
import ProfileImage from 'src/assets/images/profile/user-2.jpg'

export const getCommittee = async (data) => {
  try {    
    const data = [
        {
          name: `Kazi Mohammad Mahbubul Hoque`,
          img: ProfileImage,
          post: `President`
        },
        {
          name: `Mohammad Abdul Bari`,
          img: ProfileImage,
          post: `Vice President`
        },
        {
          name: `Md. Akhtaruzzaman`,
          img: ProfileImage,
          post: `Vice President`
        },
        {
          name: `Md. Faisal Hossain`,
          img: ProfileImage,
          post: `General Secretary`
        },
        {
          name: `Dr. Md. Azam Hossain`,
          img: ProfileImage,
          post: `Treasurer`
        },
        {
          name: `Jewel Rana`,
          img: ProfileImage,
          post: `Joint Secretary`
        },
        {
          name: `Md. Farhad Alam Bhuiyan`,
          img: ProfileImage,
          post: `Organizational Secretary`
        },
        {
          name: `Md. Farhad Alam Bhuiyan`,
          img: ProfileImage,
          post: `Organizational Secretary`
        },
        {
          name: `Md. Tahzib Ul Islam`,
          img: ProfileImage,
          post: `Departmental Secretary`
        },
        {
          name: `Md. Rubel Pasha`,
          img: ProfileImage,
          post: `Cultural Secretary`
        },
        {
          name: `Kazi Safaet Mahmud Auvi`,
          img: ProfileImage,
          post: `Publications and Intellectual Secretary`
        },
        {
          name: `Md Abeed Hossain`,
          img: ProfileImage,
          post: `Sports Secretary`
        },
        {
          name: `Md. Khairul Bashar`,
          img: ProfileImage,
          post: `Public Relations and Communication Secretary`
        },
        {
          name: `Abdullah Ibne Masud`,
          img: ProfileImage,
          post: `Branding and Graphic Design Secretary`
        },
        {
          name: `Md. Abu Nader Al Mokaddas`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Mohammad Miraj Uddin Khan`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Nahid Hasan`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Helal Hejazi`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Anjum Riashat`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Shahrear Bin Amin`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Md. Shafiqul Islam`,
          img: ProfileImage,
          post: `Executive Member`
        },
        {
          name: `Rahat Hossain`,
          img: ProfileImage,
          post: `Executive Member`
        }
      ];

    return data;      
    
  } catch (error) {
    throw error;
  }
};

