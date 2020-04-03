const router = require('express').Router();
const User = require('../../models/user_model');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post(async (req, res)=>{
    const {username, password} = req.body
    try {
        let user = await User.findOne({username});

        if(user){
            return res.status(401).json({message: 'Username or password is taken'})
        }

        user = await User.create({
            username, password
        })
        return res.status(200).json({ message: 'OK', user });
    } catch (error) {
        res.status(500).json({error})
    }

});

module.exports = router;