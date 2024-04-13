import User from "../models/users-model.js";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// import dotenv from "dotenv";


// user autentication tk be the here work it
// passport js
// JWT token
// eassy library -> passport.js

// famous library is the passport for the user Authontication and Authorization and development

export const getUserRenderList = async (req, res) => {
    try {
        const userOne = await User.find();
        console.log(userOne);
        console.log(path.resolve());
        return res.render(path.join(path.resolve(), './pages/index.ejs'), { UserListAll: userOne });

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        return res.status(201).json({
            successTrue: true,
            message: allUser,
        });

    } catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};
export const postUserLogin = async (req, res) => {
    try {
        const saltRounds = 10; // 10 is the make strong hasing algorithm for the password
        // private and public key match through make the strong authontication and authorization

        res.user = req.body;
        const userLoginInfo = await User.findOne({ email: res.user.email });
        const decoded = jwt.verify(userLoginInfo.token, process.env.SECREAT_KEY);
        
        if (decoded) {
            
            const isAuth = bcrypt.compareSync(res.user.password, userLoginInfo.password);
            console.log(isAuth);
            
            if (isAuth) {

                const jwtToken = jwt.sign({ email: req.body.email }, process.env.SECREAT_KEY);
                userLoginInfo.token = jwtToken;
                userLoginInfo.save();

                return res.status(200).json({
                    successTrue: true,
                    message: res.user.email + " Log in Successfully " + jwtToken,
                });
            }
            else {
                return res.status(404).json({
                    successTrue: false,
                    message: "invalid password",
                });
            }

        } else {
            return res.status(404).json({
                successTrue: false,
                message: "invalid email",
            });
        }


    } catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};

export const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const allUser = await User.findById(id);

        return res.status(201).json({
            successTrue: true,
            message: allUser,
        });

    } catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};

export const postCreateUser = async (req, res) => {
    try {
        const saltRounds = 10;
        res.user = req.body;
        const jwtToken = jwt.sign({ email: req.body.email }, process.env.SECREAT_KEY);
        const hash = bcrypt.hashSync(res.user.password, saltRounds);

        res.user.password = hash;
        res.user.token = jwtToken;
        const user = await User.create(res.user);

        return res.status(201).json({
            successTrue: true,
            message: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            successTrue: false,
            message: err.message,
        });
    }
}

export const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const replaceUser = await User.findOneAndReplace({ _id: id }, req.body, { new: true });

        return res.status(201).json({
            successTrue: true,
            message: replaceUser,
        });
    } catch (error) {
        return res.status(404).json({
            successTrue: true,
            message: error.message,
        });
    }
};

export const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        return res.status(201).json({
            successTrue: true,
            message: updateUser,
        });
    } catch (error) {
        return res.status(404).json({
            successTrue: true,
            message: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete({ _id: id });

        return res.status(201).json({
            successTrue: true,
            message: deleteUser || "User not exist",
        });
    }
    catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};


