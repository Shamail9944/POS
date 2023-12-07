import User from '../Models/userModel.js'


// add User
export const registerController = async (req, res) => {
    const { fname, lname, usid, password } = req.body;
    // console.log("data rcv backend=", data);

    try {
        const newUser = new User({ fname, lname, usid, password, verified: true })
        await newUser.save()
        if (newUser) {
            res.status(200).send("New User registered successfully.");
        } else {
            res.status(400).send("Login failed")
        }
    } catch (error) {
        res.status(400).send("Error in registering new User.");
        console.log(error);
    }
};

// get User
export const loginController = async (req, res) => {
    const { usid, password } = req.body;
    try {
        const chkUser = await User.findOne({ usid, password, verified: true });

        if (chkUser) {
            res.status(200).send(chkUser);
            res.status(200).send("User Logged in successfully.");
        } else {
            res.status(400).send("User not registered.");
        }
    } catch (error) {
        console.log(error);
    }
};

