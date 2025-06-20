const express = require('express');
const cors = require('cors');
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('./model/userModel');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
//Database Connection 
mongoose.connect('mongodb://localhost:27017/captchalogin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Generate CAPTCHA
app.get('/api/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 2,
    color: true,
    background: '#f4f4f5'
  });
  req.session.captcha = captcha.text;
  res.type('svg');
  res.send(captcha.data);
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashed });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists or invalid data' });
  }
});
app.get('/',(req,res)=>{
    res.json({success:true,message:"Hello user you are using 5000 port "})
})
app.post('/api/login', async (req, res) => {
  const { email, password, captcha } = req.body;
  if (captcha !== req.session.captcha) {
    return res.status(400).json({ message: 'Invalid CAPTCHA' });
  }

  const user = await userModel.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password' });

  return res.status(200).json({ message: 'Login successful', name: user.name });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
