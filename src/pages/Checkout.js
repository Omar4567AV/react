import { useState } from 'react';

const Checkout = ({ cartItems, setCartItems }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [done, setDone] = useState(false);

    const total = cartItems.reduce((sum, item) => {
        const price = item?.price || '$0';
        return sum + Number(price.replace('$', ''));
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !address) {
            alert('Fill all fields');
            return;
        }

        setDone(true);
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    if (done) {
        return (
            <main style={{ padding: '40px' }}>
                <h1>Order confirmed ✅</h1>
                <p>Thank you {name}</p>
            </main>
        );
    }

    return (
        <main style={{ padding: '40px' }}>
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <br /><br />

                <h3>Total: ${total}</h3>

                <button type="submit">Confirm Order</button>
            </form>
        </main>
    );
};

export default Checkout;