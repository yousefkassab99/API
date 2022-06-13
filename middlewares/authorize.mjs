function authorize(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = !authHeader ? null : authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json();
    }
    jwt.verify(token, 'Top Secret!!!', (err, email) => {
        if (err) {
            console.log(err);
            return res.status(403).json();
        }

        console.log(email);
        req.email = email;
        next();
    });
}