<script>
    import { enhance } from "$app/forms";
</script>

<div class="container">
    <h2 class="black-text mb-4">Create New Genre</h2>
    
    <div class="cyber-card">
        <div class="card-body">
            <form method="POST" action="?/create" use:enhance>
                <div class="mb-3">
                    <label for="genre" class="form-label neon-text">Genre Name</label>
                    <input 
                        type="text" 
                        class="cyber-input" 
                        id="genre" 
                        name="genre" 
                        required
                    >
                </div>
                
                <div class="mb-4">
                    <label for="description" class="form-label neon-text">Description</label>
                    <textarea 
                        class="cyber-input" 
                        id="description" 
                        name="description" 
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div class="d-flex gap-2">
                    <a href="/genres" class="cyber-button">Cancel</a>
                    <button type="submit" class="cyber-button flex-grow-1">Create Genre</button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 2rem auto;
    }
    
    .neon-text {
        color: #00ffcc;
        text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
    }
    
    .cyber-card {
        background: #1a1a1a;
        border: 1px solid #ff00ff;
        border-radius: 4px;
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
        padding: 2rem;
        animation: glow 2s infinite alternate;
    }
    
    @keyframes glow {
        from {
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
        }
        to {
            box-shadow: 0 0 30px rgba(255, 0, 255, 0.4);
        }
    }
    
    .cyber-input {
        width: 100%;
        background: #2a2a2a;
        border: 1px solid #00ffcc;
        border-radius: 4px;
        color: #ffffff;
        padding: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .cyber-input:focus {
        background: #333;
        border-color: #ff00ff;
        box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
        outline: none;
    }
    
    .cyber-button {
        background: #ff00ff;
        color: #000;
        border: none;
        padding: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .cyber-button:hover {
        background: #00ffcc;
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
    }
</style>