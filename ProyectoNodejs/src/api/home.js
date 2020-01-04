//controlador de pagina principal
const ctrl = {}
ctrl.index =(req, res)=> {
    res.render(`index`);
};
ctrl.about=(req, res)=> {
    res.render(`about`);
    }
module.exports = ctrl;