<script setup>
import { onMounted } from "vue";
import addModal from "./addModal.vue";
import editModal from "./editModal.vue";
import { useTransactionStore } from "./stores/transactionStore";
import supabase from "./config/supabase";


const storeTransactions = useTransactionStore()


function openEditModal(transaction) {
    storeTransactions.selectedTransaction = transaction
    storeTransactions.showEditModal = true

}

async function logout() {
    let { error } = await supabase.auth.signOut()
    window.location.reload()

}

onMounted(() => {
    storeTransactions.loadTransactions()
})

</script>

<template>
    <router-view />
    <div class="header">
        <div class="left">
            <h1 id="title">Transaction <br>
                <hr id="titleLine">Tracker
            </h1>
        </div>
        <div class="right1"><button class=headerButtons @click="settings">
                <font-awesome-icon icon="gear" />
            </button></div>
        <div class="right2"><button class=headerButtons @click="logout">
                <font-awesome-icon icon="arrow-right-from-bracket" />
            </button></div>
    </div>

    <div id="box">

        <div class="upperBar">
            <p id="totalSum">Total sum: <br><b>{{ storeTransactions.totalSum }}€</b></p>
            <p id="totalIncome">Total income: <br><b>{{ storeTransactions.totalIncome }}€</b></p>
            <p id="totalExpense">Total expense: <br> <b>{{ storeTransactions.totalExpense }}€</b></p>
        </div>
        <hr id="upperDivider">
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
#totalIncome b {
    color: rgb(25, 180, 59);
}

#upperDivider {
    margin-bottom: 25px;
}

.upperBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 15px 0;
    margin-top: 20px;
    text-align: center;
}

.upperBar p {
    margin: 0;
}

.upperBar b {
    font-size: 2rem;
    display: inline-block;
    margin-top: 5px;
}

#totalIncome {
    padding: 5px;
    color: white;
    font-size: 15px;
    color: rgb(25, 180, 59);

}

#totalExpense {
    padding: 5px;
    color: white;
    font-size: 15px;
    color: rgb(146, 17, 17);
}

#totalSum {
    padding: 5px;
    color: rgb(0, 0, 0);
    font-size: 15px;
}

#titleLine {
    margin: none;
    border: 1px solid white;
}

.headerButtons {
    padding: 5px;
    color: white;
    background-color: transparent;
    border: none;
    font-size: 25px;
    transition: 200ms;
}

.headerButtons:hover {
    transform: translateY(-2px);
    color: rgb(236, 232, 232);
    cursor: pointer;
}

.header {
    display: flex;
    background-color: rgb(25, 180, 59);
    padding-left: 1.5vh;
    padding-right: 1.5vh;
    align-items: center;
    border-bottom: 2px solid green;
    box-shadow: 2px 1px 4px gray;
}

.left {
    margin-right: auto;
}

@media (min-width: 768px) {
    .left {
        margin-left: 2vw;
    }

    .right1,
    .right2 {
        transform: translateX(-2vw);
    }


}



#title {
    color: white;
    font-weight: bold;
    font-size: 1.75rem;
}

#box {
    width: 95%;
    max-width: 900px;
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
    margin-bottom: 12px;
    border-radius: 20px;
    width: 100%;
    box-sizing: border-box;
}

#transactionDiv {
    display: grid;
    grid-template-columns: max-content 1fr 90px;
    gap: 15px;
    align-items: center;
    padding: 15px 20px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#showAddModalButton {
    padding: 15px;
    margin: 0px 0px 25px 0px;
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
