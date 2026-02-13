<script setup>
import { onMounted } from "vue";
import addModal from "./addModal.vue";
import editModal from "./editModal.vue";
import { useTransactionStore } from "./stores/transactionStore";

const storeTransactions = useTransactionStore()


function openEditModal(transaction) {
  storeTransactions.selectedTransaction = transaction
  storeTransactions.showEditModal = true

}

onMounted(() => {
  storeTransactions.loadTransactions()
})

</script>

<template>
  <div class="header">
    <h1 id="title">Transaction Tracker</h1>
  </div>

  <div id="box">

    <button id="showAddModalButton" @click="storeTransactions.showAddModal = true">Add Transaction</button>

    <div class="transactions">
      <div id="transactionDiv" @click="openEditModal(transaction)"
        :class="{ isIncome: transaction.isIncome, isExpense: !transaction.isIncome }"
        v-for="transaction in storeTransactions.transactions" :key="transaction.id">
        <b><span class="transactionAmount">{{ transaction.amount + "€" }}</span></b>
        <span class="transactionDescription">{{ transaction.description }}</span>
        <span class="transactionDate">{{ transaction.date }}</span>
      </div>
    </div>
  </div>

  <addModal v-if="storeTransactions.showAddModal" />
  <editModal v-if="storeTransactions.showEditModal" />




</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: rgb(246, 247, 248);
}
</style>

<style scoped>
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
  grid-template-columns: 75px auto 90px;
  align-items: center;
  box-shadow: 2px 2px 2px gray;
  background-color: rgb(255, 255, 255);
  transition: 200ms;
  cursor: pointer;
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

.transactionDate {
  color: black;
}
</style>
