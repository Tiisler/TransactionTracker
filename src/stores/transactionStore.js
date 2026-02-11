import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transactions', () => {

    const selectedTransaction = ref(null)

    let id = 0
    const transactions = ref([{ id: id++, amount: 15.9, description: "School supplies", isIncome: false, date: "2025-02-14" },
    { id: id++, amount: 850, description: "Salary", isIncome: true, date: "2025-02-19" }
    ])

    const showEditModal = ref(false)
    const showAddModal = ref(false)

    function addTransaction(NewTransaction) {
        transactions.value.push({ id: id++, amount: NewTransaction.amount, description: NewTransaction.description, isIncome: NewTransaction.isIncome, date: NewTransaction.date })
    }

    function editTransaction(changedTransaction) {
        const index = transactions.value.findIndex(t => t.id === changedTransaction.id)
        if (index !== -1) {
            transactions.value[index] = { id: changedTransaction.id, description: changedTransaction.description, amount: changedTransaction.amount, isIncome: changedTransaction.isIncome, date: changedTransaction.date }
        }
    }

    function removeTransaction(id) {
        transactions.value = transactions.value.filter(t => t.id !== id)
        showEditModal.value = false
    }





    return {

        transactions,
        showEditModal,
        showAddModal,
        selectedTransaction,

        // Functions
        addTransaction,
        editTransaction,
        removeTransaction

    }

})
