<script setup>
import { ref } from "vue";

let id = 0
const transactionList = ref([{id:id++, amount:15.9, description:"School supplies", profit:false},
  {id:id++, amount:850, description:"Salary",profit:true}
])

const newTransaction = ref("")

function addTransaction(){
  transactionList.value.push({id:id++, amount:15,description:newTransaction.value,profit:true})
  newTransaction.value = ""
}

function deleteTransaction(index){
  transactionList.value.splice(index,1)
}

</script>

<template>
  <div id="box">
  <input v-model="newTransaction" placeholder="Enter a new transaction">
  <button @click="addTransaction"></button>
  <div class="transactions">
  <div id="transactionDiv" :class="{profit : transaction.profit, loss : !transaction.profit}" v-for="(transaction, index) in transactionList" :key="transaction.id">
    <b><span class="transactionAmount">{{ transaction.amount + "€"}}</span></b>
    <span class="transactionDescription">{{transaction.description}}</span>
    <button class="deleteButton" @click="deleteTransaction(index)">X</button>
  </div>
  </div>
  </div>
</template>

<style scoped>

#box {
  max-width: 80vw;
  margin: 0 auto;
}

.profit {
  background-color: rgb(86, 134, 12);
}

.loss {
  background-color: rgb(146, 17, 17);
}

.transactions {
  display: flex;
  gap: 12px;      /* vahe elementide vahel */
  align-items: left;
  flex-direction: column;
}

.transactions div{
  padding: 20px;
  margin: 0px 50px 0px;
  border-radius: 10px;
}

#transactionDiv {
  display: grid;
  grid-template-columns: 75px auto 30px;
  align-items: center;
  box-shadow: 3px 3px 2px gray;

}

.transactionAmount {
  color:white;
  font-size:20px;
  min-width: 5vw;
}

.deleteButton {
  border: none;
  background-color: white;
  border-radius: 15px;
  border-color: black;
  padding: 8px 20px 8px 10px;
  border: 1px solid;
  transition: 200ms;
  box-shadow: 1px 1px 5px;
}

.deleteButton:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: rgb(235, 229, 229);
}

</style>
