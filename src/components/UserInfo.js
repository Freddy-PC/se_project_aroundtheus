// Renders info fields in profile-icon (Edit-Button)
class UserInfo {
  constructor({ userName, userJob, profileImage }) {
    // Grabs object of user info
    this._profileName = document.querySelector(userName);
    this._profileJob = document.querySelector(userJob);
    //Object of profile image
    this._profileImage = document.querySelector(profileImage);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    // Returns an object with info about the user
    // Handy when NECESSARY to display the user data in the open form
  }
  setUserInfo({ profileName, profileJob }) {
    // Takes new user data and adds it on the page
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
  setProfileImage({ avatar }) {
    this._profileImage.src = avatar; // image equal to avatar from api
    this._profileImage.alt = "Profile-image-here"; // alt equal to api textcontent
    console.log(this._profileImage);
  }
}

export default UserInfo;
