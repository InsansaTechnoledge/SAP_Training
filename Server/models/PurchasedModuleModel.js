import mongoose from 'mongoose';

const PurchasedModuleSchema = new mongoose.Schema({
    ModuleId: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const PurchasedModule = new mongoose.model("PurchasedModule", PurchasedModuleSchema);
export default PurchasedModule;
