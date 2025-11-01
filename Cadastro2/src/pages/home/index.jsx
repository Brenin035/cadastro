import'./style.css'
import { useState, useEffect } from 'react'
import { db } from '../../firebase.js'
import { collecttion, addDoc, getDocs, doc } from 'firebase/firestore'
import  Trash from '../../assets/delete.png'


function Home() {
    const [nome, setNome] = useState('')
    const [age, setAge] = useState('')
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

    return (
        <div className='container'>
            <form>
              <h1>Cadastro de Usuários</h1>
               <input
                name= 'Nome'
                type='text'
                placeholder='Nome'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
                <input
                name= 'Idade'
                type='number'
                placeholder='Idade'
                value={age}
                onChange={e => setAge (e.target.value)}
                />
                <input
                name= 'Email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail (e.target.value)}
                />
                <button type='button' onClick={handleAddUser}>Cadastrar</button>
                </form>

                {users.map (user => (
                    <div key={user.id} className='card'>
                        <div>
                            <p>Nome: <span>{user.name}</span></p>
                            <p>Idade: <span>{user.age}</span></p>
                            <p>Email: <span>{user.email}</span></p>
                        </div>
                        <button onClick={() => handleDeletelocal(user.id)}>
                            <img src={Trash} alt='Excluir' />
                        </button>
                    </div>
                ))}
        </div>
    )
}


export default Home 