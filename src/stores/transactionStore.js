import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import supabase from '@/config/supabase'

export const useTransactionStore = defineStore('transactions', () => {

    const selectedTransaction = ref(null)

    let id = 0
    const transactions = ref([])
    const showEditModal = ref(false)
    const showAddModal = ref(false)

    const totalIncome = computed(() => {
        return transactions.value.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0)
    })

    const totalExpense = computed(() => {
        return transactions.value.filter(t => !t.isIncome).reduce((sum, t) => sum - t.amount, 0)
    })

    const totalSum = computed(() => totalIncome.value + totalExpense.value)


    async function loadTransactions() {
        const { data: { user } } = await supabase.auth.getUser()

        let { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false })
            .eq("user_id", user.id)

        if (error) {
            console.error("Error loading data:", error.message)
            return
        }
        if (data) transactions.value = data

    }

    async function addTransaction(NewTransaction) {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('transactions')
            .insert([{
                description: NewTransaction.description,
                amount: NewTransaction.amount,
                isIncome: NewTransaction.isIncome,
                date: NewTransaction.date,
                user_id: user.id
            },
            ])
            .select()
        if (error) {
            console.error("Error adding transaction:", error.message)
        } else if (data) {
            transactions.value.push(data[0])
            transactions.value.sort((a, b) => new Date(b.date) - new Date(a.date))
        }
    }

    async function editTransaction(changedTransaction) {
        const { error } = await supabase
            .from('transactions')
            .update({
                description: changedTransaction.description,
                amount: changedTransaction.amount,
                isIncome: changedTransaction.isIncome,
                date: changedTransaction.date
            })
            .eq('id', changedTransaction.id)
        if (error) {
            console.error("Error while editing: ", error.message)
        }

        const index = transactions.value.findIndex(t => t.id === changedTransaction.id)
        if (index !== -1) {
            transactions.value[index] = { id: changedTransaction.id, description: changedTransaction.description, amount: changedTransaction.amount, isIncome: changedTransaction.isIncome, date: changedTransaction.date }
            transactions.value.sort((a, b) => new Date(b.date) - new Date(a.date))
        }
    }

    async function removeTransaction(id) {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id)

        if (error) {
            console.log("Error deleting: ", error.message)
        }

        transactions.value = transactions.value.filter(t => t.id !== id)
        showEditModal.value = false
    }






    return {

        transactions,
        showEditModal,
        showAddModal,
        selectedTransaction,
        totalIncome,
        totalExpense,
        totalSum,

        // Functions
        loadTransactions,
        addTransaction,
        editTransaction,
        removeTransaction


    }

})
