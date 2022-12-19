exports.check_product_authorization = async (user) => {
    try {
        if (user && (user.role == 'Admin')) {
            return true
        } else {
            throw { code: 401, message: 'Unauthorized User' }
        }
    } catch (error) {
        throw error;
    }
};