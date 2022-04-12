import axios from "axios";
// import post from "../../../schema/post";

export const createpost = async (post,data) => {
  try {
    console.log(post,data);
    return await axios.post(`/create/?data=${data}`,post);
  } catch (er) {
    console.log(er);
  }
};
export const createImage = async (formData) => {
  try {
    // console.log(post);
    return await axios.post("/sendImage", formData);
  } catch (er) {
    console.log(er);
  }
};

export const getpost = async (search) => {
  try {
    // console.log(search);
    return await axios.get(`/create${search}`);
  } catch (er) {
    console.log(er);
  }
};
export const detailview = async (id) => {
  try {
    return await axios.get(`/detailview/${id}`);
  } catch (er) {
    console.log(er);
  }
};

export const updated = async (id, post,data) => {
  try {
    return await axios.post(`/update/${id}/?data=${data}`, post);
  } catch (er) {
    console.log(er);
  }
};



export const deletblog = async (id) => {
  try {
    return await axios.delete(`/delet/${id}`);
  } catch (er) {
    console.log(er);
  }
};


export const uploadFile = async (data, config) => {
  try {
    return await axios.post("/file/upload", data, config);
  } catch (er) {
    console.log(er);
  }
};
export const postcomment = async (data) => {
  try {
    return await axios.post("/comments", data);
  } catch (er) {
    console.log(er);
  }
};
export const getcomment = async (id) => {
  try {
    // console.log(id);
    return await axios.get(`/comment/${id}`);
  } catch (er) {
    console.log(er);
  }
};

export const deleatcmnt = async (id) => {
  try {
    return await axios.delete(`/deleate/${id}`);
  } catch (er) {
    console.log(er);
  }
};

// =========>> This is user profile Section <<=========

export const addProfile = async (profileData) => {
  try {
    // console.log(profileData);
    return await axios.post("/addProfile", profileData);
  } catch (er) {
    console.log(er);
  }
};


export const getProfile = async (data) => {
  try {
    console.log(data);
    return await axios.get(`/getProfile/${data}`);
  } catch (er) {
    console.log(er);
  }
};

export const getAllProfile = async () => {
  try {
     return await axios.get(`/getallProfile`);
  } catch (error) {
    console.log(error);
  }
}


export const updateProfile = async (userid, profile,data) => {
  try {

    return await axios.post(`/updateProfile/${userid}/?data=${data}`, profile);
    
  } catch (er) {
    console.log(er);
  }
};

// ========>> api for follow the creater <<======

export const addFollowing = async(userid,profileId) => {
  try {
    // console.log(userid)
    return await axios.get(`/addFollowing/${userid}/${profileId}`); 
  }
  catch (er) {
    console.log(er);
  }
}


export const removeFollowing = async (userid, profileId) => {
  try {
    // console.log(userid);
    return await axios.get(`/removeFollowing/${userid}/${profileId}`);
  } catch (er) {
    console.log(er);
  }
};

export const getAllFollowers = async (userid) => {
  try {
   
    return await axios.get(`/getAllFollowers/${userid}`);
  } catch (er) {
    console.log(er);
  }
}
export const getAllFollowings = async (userid) => {
  try {

    return await axios.get(`/getAllFollowings/${userid}`);

  } catch (er) {
    console.log(er);
  }
}

export const filterFollowers = async (userid) => {
  try {
    console.log(userid);
    return await axios.get(`/filterFollowers/${userid}`);
  } catch (er) {
    console.log(er);
  }
};

export const updadteImage = async (baseData) => {
  try {
    return await axios.post(`/updateImage`,baseData);
  } catch (error) {
    console.log(error);
  }
}

export const sendNoti = async (userid, message,blogId) => {
  
  try {

    return await axios.post(`/sendNotification/?userid=${userid}&message=${message}&blogId=${blogId}`);
    
  } catch (error) {
    console.log(error);
  }
}

export const Unseen = async(userid) => {
  try {
    return await axios.get(`/unseen/?userid=${userid}`);
  } catch (error) {
    console.log(error);
  }
}

