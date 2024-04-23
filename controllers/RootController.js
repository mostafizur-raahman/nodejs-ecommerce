const rootController = (req, res) => {
    return res.status(200).send({
        success: "OK",
        message: "Hello World",
    });
};

export default rootController;
