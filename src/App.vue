<script setup>
import { ref } from "vue";
import addModal from "./addModal.vue";
import editModal from "./editModal.vue";

const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedTransaction = ref(null)

let id = 0
const transactionList = ref([{ id: id++, amount: 15.9, description: "School supplies", isIncome: false },
{ id: id++, amount: 850, description: "Salary", isIncome: true }
])


function handleAddTransaction(newTransaction) {
  transactionList.value.push({ id: id++, amount: newTransaction.amount, description: newTransaction.description, isIncome: newTransaction.isIncome })
  showAddModal.value = false;
}

function handleUpdateTransaction(updatedTransaction) {
  const index = transactionList.value.findIndex(t => t.id === updatedTransaction.id)
  if (index !== -1) {
    transactionList.value[index] = updatedTransaction
  }
  showEditModal.value = false
}

function handleRemoveTransaction() {
  transactionList.value = transactionList.value.filter(t => t.id !== selectedTransaction.value.id)
  showEditModal.value = false
}

function updateFunction(transaction) {
  selectedTransaction.value = transaction
  showEditModal.value = true

}

</script>

<template>
  <div id="background">
    <div class="header">
      <h1 id="title">Transaction Tracker</h1>
    </div>

    <div id="box">

      <button id="showAddModalButton" @click="showAddModal = true">Add Transaction</button>

      <div class="transactions">
        <div id="transactionDiv" @click="updateFunction(transaction)"
          :class="{ isIncome: transaction.isIncome, isExpense: !transaction.isIncome }"
          v-for="transaction in transactionList" :key="transaction.id">
          <b><span class="transactionAmount">{{ transaction.amount + "€" }}</span></b>
          <span class="transactionDescription">{{ transaction.description }}</span>
        </div>
      </div>
    </div>

    <addModal v-if="showAddModal" @close="showAddModal = false" @add="handleAddTransaction" />
    <editModal v-if="showEditModal" @close="showEditModal = false" :transaction="selectedTransaction"
      @edit="handleUpdateTransaction" @remove="handleRemoveTransaction" />

  </div>




</template>

<style scoped>
#background {
  background-color: rgb(246, 247, 248);
  padding-bottom: 54vh;
}

.header {
  background-color: green;
  padding: 3vh;
}

#title {
  margin: 50;
}

#box {
  max-width: 50vw;
  margin: 0 auto;
}

.isIncome {
  border: 2px solid;
  border-color: rgb(25, 180, 59);
  color: rgb(25, 180, 59);
}

.isExpense {
  border: 2px solid;
  border-color: rgb(146, 17, 17);
  color: rgb(146, 17, 17);
}

.transactions {
  display: flex;
  gap: 12px;
  align-items: left;
  flex-direction: column;
}

.transactions div {
  padding: 20px;
  margin: 0px 50px 0px;
  border-radius: 20px;
}

#transactionDiv {
  display: grid;
  grid-template-columns: 75px auto 30px;
  align-items: center;
  box-shadow: 2px 2px 2px gray;
  background-color: rgb(255, 255, 255);
  transition: 200ms;
}

#transactionDiv:hover {
  transform: translateY(-2px);
}

.transactionAmount {
  font-size: 1.5rem;
  min-width: 5vw;
}

.transactionDescription {
  color: black;
  font-size: 1.25rem;
}

#showAddModalButton {
  padding: 15px;
  margin: 20px 20px 20px 50px;
  border-radius: 20px;
  border: 2px solid green;
  background-color: rgb(25, 180, 59);
  color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: 200ms;
  box-shadow: 2px 2px 2px gray;
}

#showAddModalButton:hover {
  transform: translateY(-2px);
  background-color: rgb(19, 145, 46);
}
</style>
