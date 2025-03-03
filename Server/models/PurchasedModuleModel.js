import mongoose from 'mongoose';

const PurchasedModuleSchema = new mongoose.Schema({
    ModuleId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const PurchasedModule = mongoose.model("PurchasedModule", PurchasedModuleSchema);
export default PurchasedModule;
