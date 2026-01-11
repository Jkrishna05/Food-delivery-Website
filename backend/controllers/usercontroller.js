let signupUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email.trim().toLowerCase();

    // Validate
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Check if exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ name, email, password: hashpassword });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token(newUser._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
