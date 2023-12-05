import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// register
export const registration = async (req, res) => {
  // fetch all data from request body
  const { name, email, password, designation } = req.body;

  try {
    // validation
    if (!name || !email || !password || !designation) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // check if email is exist
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    //encrypt password
    const hashPassword = await bcrypt(password, 10);

    // create entry on db
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      designation,
    });


    // Generate a JSON Web Token (JWT)
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const token = jwt.sign({ _id: user._id }, "dfdfdsfdsfdsb");

    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("token", token, options)
      .status(statusCode)
      .json({
        success: true,
        token,
        user,
        message: `Account Created Successfully!`,
      });
  } catch (error) {
    return res.status(500).json({
        success:false,
        message: error
    })
  }
};


//login
export const login =  async(req, res)=>{

    // fetch all the data from request body
    const {email, password} = req.body

    try {
        // validation 
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter required field"
            })
        }

        // check email exist ot not
        const isEmailExist = User.findOne({email}).select("+password")
        if(!isEmailExist){
            return res.status()

        }

    } catch (error) {
        
    }
}
