<script setup>
import { ref } from 'vue'

const emit = defineEmits("edit", "remove", "close")

const props = defineProps(["transaction"])

const id = ref(props.transaction.id)
const description = ref(props.transaction.description)
const amount = ref(props.transaction.amount)
const profitOrLoss = ref(props.transaction.isIncome ? "Income" : "Expense")


function editTransaction() {

    if (!description.value || !amount.value || !profitOrLoss.value) {
        alert("Please fill all fields!");
        return;
    }

    let income = false;
    if (profitOrLoss.value === "Income") {
        income = true;
    }

    emit("edit", { id: id.value, description: description.value, amount: amount.value, isIncome: income })
    newTransaction.value = "";
    amount.value = null;
}


</script>

<template>

    <div class="modalOverlay">
        <div class="modalContent">
            <h2>Edit Transaction</h2>
            <hr id="upperLine">
            <input v-model="description" placeholder="Description" maxlength="70">
            <input type="number" v-model="amount" placeholder="Amount">
            <h3>Select transaction type:</h3>
            <select v-model="profitOrLoss" id="typeSelector">
                <option disabled value="">Please select one</option>
                <option>Income</option>
                <option>Expense</option>
            </select>
            <hr id="lowerLine">
            <div class="flexButtons">
                <button @click="editTransaction" class="updateButton">Update</button>
                <button @click="emit('close')" class="cancelButton">Cancel</button>
                <button @click="emit('remove')" class="deleteButton">Delete</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
#typeSelector {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgb(238, 237, 237);
}

#upperLine {
    margin-bottom: 15px;
}

#lowerLine {
    margin-top: 30px;
}

.modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.493);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modalContent {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    min-width: 300px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    padding: 8px;
    margin: 10px 0;
    width: 90%;
    border-radius: 10px;
    border: 1px solid rgb(70, 67, 67);
    box-shadow: 2px 2px 2px rgb(238, 237, 237);
}

.updateButton {
    background-color: rgb(25, 180, 59);
    color: white;
    border: 1px solid green;
    padding: 10px 17px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 15px;
    border-radius: 10px;
    transition: 200ms;
    font-weight: bold;
    box-shadow: 2px 2px 3px gray;
}

.updateButton:hover {
    transform: translateY(-2px);
}

.cancelButton {
    background-color: #7a7370b7;
    color: white;
    font-weight: bold;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    border-radius: 10px;
    transition: 200ms;
    border: 1px solid rgb(56, 54, 54);
    box-shadow: 2px 2px 3px gray;
}

.cancelButton:hover {
    transform: translateY(-2px);
}

.deleteButton {
    background-color: #a72c07b7;
    color: white;
    font-weight: bold;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    border-radius: 10px;
    transition: 200ms;
    border: 1px solid rgb(133, 28, 28);
    box-shadow: 2px 2px 3px gray;
    margin-left: 15px;
}

.deleteButton:hover {
    transform: translateY(-2px);
}

.flexButtons {
    margin-top: 20px;
    box-sizing: border-box;
}

hr {
    width: 100%;
}
</style>