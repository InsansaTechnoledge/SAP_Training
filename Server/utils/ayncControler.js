const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}   


const postUser = asyncHandler(async (req, res, next) => {
    const user = await user.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
}   );