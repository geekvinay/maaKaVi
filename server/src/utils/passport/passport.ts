// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { findUserByUsername } from '../../repository/user/user';
// import bcrypt from 'bcryptjs';
// import { IUser } from '../../models/user/user';

// passport.use(new LocalStrategy(async (username, password, done) => {
//     try {
//         const user = await findUserByUsername(username);
//         if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//     } catch (err) {
//         return done(err);
//     }
// }));

// passport.serializeUser((user: IUser, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id: string, done) => {
//     findUserByUsername(id).then((user) => done(null, user)).catch((err) => done(err));
// });
