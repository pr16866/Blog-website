import UserCollection from "../schema/profile.js";
// import * as timeago from "timeago.js";
import cloudinary from "cloudinary";
let cloud = cloudinary.v2;
import dotenv from "dotenv";
dotenv.config();

cloud.config({

  cloud_name: process.env.Cloud_name,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
  secure: true,

});

export const addProfile = async (req, res) => {
  try {
    
    const response = await UserCollection.insertMany([req.body]);
     console.log(response);
    res.send(response);


  } catch (er) {
    console.log(er);
  }
};

export const getallProfile = async (req,res) => {
  try {
    let data = await UserCollection.find({});
    res.send(data);
  } catch (error) {
    console.log(error)
  }
}
export const getProfile = async (req, res) => {
  try {

    const response = await UserCollection.findOne(req.query);
    if (response)
    {
      response.notification = response.notification.reverse();  
}

    
    res.send(response);
  } catch (er) {
    console.log(er);
  }
};


export const addFollowing = async (req, res) => {
  try {
    // =========>> for followersArr <<=========
   
    const data = await UserCollection.findOne({ userid: req.params.userid });
    let followersArr = data.followersUserId;
    const newdata = followersArr.push(req.params.profileId);
    const response = await UserCollection.findOneAndUpdate(
      { userid: req.params.userid },
      {
        $set: {

          followersUserId:followersArr
          ,
        },
      }
    );

    // =========>> for followingsArr <<=========
    const followingData = await UserCollection.findOne({ userid: req.params.profileId });
    let followingArr = followingData.followingsUserId;
    followingArr.push(req.params.userid);

    await UserCollection.findOneAndUpdate({ userid: req.params.profileId }, {
        $set: {
        followingsUserId:followingArr,
    }
    }
    
    );
    
    res.send(response);

  } catch (er) {
    console.log(er);
  }
};


export const removeFollowing = async (req, res) => {
  try {
    //  ============>> for followers <<============
  
    let response;
    const data = await UserCollection.findOne({ userid: req.params.userid });

    let arrdata = data.followersUserId;
   
    for (let i = 0; i < arrdata.length; i++) {
      if (arrdata[i] === req.params.profileId) {
        arrdata.splice(i, 1);
        break;
      }
    }

     response = await UserCollection.findOneAndUpdate(
      { userid: req.params.userid },
      {
        $set: {
          followersUserId: arrdata,
        },
      }
    );

    //  ============>> for followings <<============
const followingsData = await UserCollection.findOne({
  userid: req.params.profileId,
});
    let followingsArrData = followingsData.followingsUserId;

    for (let i = 0; i < followingsArrData.length; i++) {
       
        if (followingsArrData[i] === req.params.userid) {
         followingsArrData.splice(i, 1);
          break;
        }
    }
 
      response = await UserCollection.findOneAndUpdate(
        { userid: req.params.profileId },
        {
          $set: {
            followingsUserId:followingsArrData,
          },
        }
      );

    res.send(response);
  } catch (er) {
    console.log(er);
  }
};


export const getAllFollowers = async (req,res) => {
  try {
  
    let data = await UserCollection.findOne(req.params);

    const response = await UserCollection.find({ userid: { $in: data.followersUserId } });
    res.send(response);
    
  } catch (er) {
    console.log(er);
  }
}


export const getAllFollowings = async (req, res) => {
  try {
    
    let data = await UserCollection.findOne(req.params);
  
    const response = await UserCollection.find({
      userid: { $in: data.followingsUserId },
    });
    res.send(response);
  } catch (er) {
    console.log(er);
  }
};


export const filterFollowers = async (req, res) => {
  try {


    const response = await UserCollection.find({
      userid: { $regex: req.params.userid, $options: "i" },
    });
    res.send(response);


  } catch (er) {
    console.log(er);
  }
};


export const updateProfile = async (req, res) => {
  try {

    let formData = req.body;

formData.imageUrl = req.query.data ? req.query.data : req.body.picture;

    let response;
   
      response = await UserCollection.findOneAndUpdate(req.params, {
        $set: formData,
      });
    
 
    res.send(response);
  } catch (er) {
    console.log(er);
  }
}

export const updateImage = async(req,res) => {
  try {
    // console.log();
    // console.log(req.body);
    res.send(req.body);
    
  } catch (error) {
    console.log(error);
  }
}


export const sendNoti = async (req, res) => {
  try {

    // console.log(req.query);
    let data = await UserCollection.findOne({ userid: req.query.userid });

    let newNotification = await UserCollection.findOne({ userid: data.followersUserId[0] });

    let notificationObj = {
      message: req.query.message,
      userid: req.query.userid,
      time: new Date(),
      seen: false,
      BlogId: req.query.blogId,
    };
    if (newNotification) {
      let notificationArr = newNotification.notification;
       notificationArr.push(notificationObj);
      console.log(notificationArr);
      let response = await UserCollection.updateMany(
        {
          userid: { $in: data.followersUserId },
        },
        {
          $set: {
            notification:
              notificationArr
          }
        }
      );
    }
  
    res.send(req.query);

  } catch (er) {
    console.log(er);
  }
}
export const Unseen = async (req, res) => {
  try {
    console.log(req.query);
    let data = await UserCollection.findOne(req.query);

    let notificationArr = data.notification.map((item, index) => {
      item.seen = true;
      return item;
    });

    // console.log(notificationArr);
        let response = await UserCollection.updateOne(req.query, {
          $set: {
        notification:notificationArr
      }
        })
    
    res.send(req.query);
  } catch (error) {
    console.log(error);
  }
}

// export const getNotification = async (req,res) => {
//   try {
//     res.send
//   } catch (error) {
//     console.log(error);
//   }
// }


const fun1 = async () => {  


let data = await UserCollection.deleteMany({});
  // let data = await UserCollection.updateMany(
  //   { name: "sujatro ghosh" },
  //   { $set: { notification: [] } }
  // );
  // let upload = new Date();
  console.log(data)
  // console.log(timeago.format(upload));

};


// fun1();

