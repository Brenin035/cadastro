import'./style.css'
import { useState, useEffect } from 'react'
import { db } from '../../firebase.js'
import { collecttion, addDoc, getDocs, doc } from 'firebase/firestore'

function Home() {
    const [nome, setNome] = useState('')
    const [age, setIdade] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])

    const usersCollection = collection(db, 'usuarios')

    useEffect(() => {
        const loadUsers = async () => {
            const snapshot = await getDocs(usersCollection)
            const lista = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }))
            setUsers(lista)
        }

        loadUsers()
    }, [])

    const handleAddUser = async () => {
        console.log("botão clicado")
        if (!nome || !age || !email) return alert('Por favor, preencha todos os campos.')

        const novoUsuario = {
            nome,
            age,
            email,
        }

        const docRef = await addDoc(usersCollection, novoUsuario)
        setUsers([...users, { id: docRef.id, ...novoUsuario}])

        setNome('')
        setAge('')
        setEmail('')
    
    }

    const handleDeletelocal = (id) => {
        const updatedusers = users.filter(user => user.id !== id)
        setUsers(updatedusers)
    }

    return ()
}
