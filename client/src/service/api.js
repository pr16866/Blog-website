import axios from "axios";
// import post from "../../../schema/post";

let api = "";
export const createpost = async (post,data) => {
  try {
    console.log(post,data);
    return await axios.post(`${api}/create/?data=${data}`,post);
  } catch (er) {
    console.log(er);
  }
};
export const createImage = async (formData) => {
  try {
    
    return await axios.post(`${api}/sendImage`, formData);
  } catch (er) {
    console.log(er);
  }
};

export const getpost = async (search) => {
  try {
   
    let var1 = await axios.get(`${api}/create${search}`);
    
    return var1;
  } catch (er) {
    console.log(er);
  }
};
export const detailview = async (id) => {
  try {
    return await axios.get(`${api}/detailview/${id}`);
  } catch (er) {
    console.log(er);
  }
};

export const updated = async (id, post,data) => {
  try {
    return await axios.post(`${api}/update/${id}/?data=${data}`, post);
  } catch (er) {
    console.log(er);
  }
};


export const deletblog = async (id) => {
  try {
    return await axios.delete(`${api}/delet/${id}`);
  } catch (er) {
    console.log(er);
  }
};


export const uploadFile = async (data, config) => {
  try {
    return await axios.post(`${api}/file/upload`, data, config);
  } catch (er) {
    console.log(er);
  }
};
export const postcomment = async (data) => {
  try {
    return await axios.post(`${api}/comments`, data);
  } catch (er) {
    console.log(er);
  }
};
export const getcomment = async (id) => {
  try {
    
    return await axios.get(`${api}/comment/${id}`);
  } catch (er) {
    console.log(er);
  }
};

export const deleatcmnt = async (id) => {
  try {
    return await axios.delete(`${api}/deleate/${id}`);
  } catch (er) {
    console.log(er);
  }
};

// =========>> This is user profile Section <<=========

export const addProfile = async (profileData) => {
  try {
    // console.log(profileData);
    return await axios.post(`${api}/addProfile`, profileData);
  } catch (er) {
    console.log(er);
  }
};


export const getProfile = async (data) => {
  try {
    // console.log(data);
    return await axios.get(`${api}/getProfile/${data}`);
  } catch (er) {
    console.log(er);
  }
};

export const getAllProfile = async () => {
  try {
     return await axios.get(`${api}/getallProfile`);
  } catch (error) {
    console.log(error);
  }
}


export const updateProfile = async (userid, profile,data) => {
  try {

    return await axios.post(
      `${api}/updateProfile/${userid}/?data=${data}`,
      profile
    );
    
  } catch (er) {
    console.log(er);
  }
};

// ========>> api for follow the creater <<======

export const addFollowing = async(userid,profileId) => {
  try {
    // console.log(userid)
    return await axios.get(`${api}/addFollowing/${userid}/${profileId}`); 
  }
  catch (er) {
    console.log(er);
  }
}


export const removeFollowing = async (userid, profileId) => {
  try {
    // console.log(userid);
    return await axios.get(`${api}/removeFollowing/${userid}/${profileId}`);
  } catch (er) {
    console.log(er);
  }
};

export const getAllFollowers = async (userid) => {
  try {
   
    return await axios.get(`${api}/getAllFollowers/${userid}`);
  } catch (er) {
    console.log(er);
  }
}
export const getAllFollowings = async (userid) => {
  try {

    return await axios.get(`${api}/getAllFollowings/${userid}`);

  } catch (er) {
    console.log(er);
  }
}

export const filterFollowers = async (userid) => {
  try {
    console.log(userid);
    return await axios.get(`${api}/filterFollowers/${userid}`);
  } catch (er) {
    console.log(er);
  }
};

export const updadteImage = async (baseData) => {
  try {
    return await axios.post(`${api}/updateImage`, baseData);
  } catch (error) {
    console.log(error);
  }
}

export const sendNoti = async (userid, message,blogId) => {
  
  try {

    return await axios.post(
      `${api}/sendNotification/?userid=${userid}&message=${message}&blogId=${blogId}`
    );
    
  } catch (error) {
    console.log(error);
  }
}

export const Unseen = async(userid) => {
  try {
    return await axios.get(`${api}/unseen/?userid=${userid}`);
  } catch (error) {
    console.log(error);
  }
}

