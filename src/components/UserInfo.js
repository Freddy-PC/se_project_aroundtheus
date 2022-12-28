// Renders info fields in profile-icon (Edit-Button)
class UserInfo {
  constructor({ userName, userJob }) {
    this._profileName = document.querySelector(userName);
    this._profileJob = document.querySelector(userJob);
    // Grabs object of user info
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    // Returns an object with info about the user
    // Handy when NECESSARY to display the user data in the open form
  }
  setUserInfo(profileName, profileJob) {
    // Takes new user data and adds it on the page
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
}

export default UserInfo;
