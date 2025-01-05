<script>
    export let studio;
</script>

<div class="studio-card">
    <a href={"/studios/" + studio._id} class="logo">
        <img src={studio.poster} alt={studio.studio} />
    </a>

    <div class="content">
        <h3><a href={"/studios/" + studio._id}>{studio.studio}</a></h3>

        <div class="info">
            <div class="meta">
                <span><strong>Founded:</strong> {studio.founded}</span>
            </div>
        </div>
    </div>
</div>

<style>
    .studio-card {
        background: #2a2a2a;
        border-radius: 8px;
        overflow: hidden;
        height: 100%;
        transition: transform 0.2s;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    .studio-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
    }

    .logo {
        display: block;
        aspect-ratio: 3/1;
        background: #fff;
        padding: 1rem;
        text-align: center;
    }

    .logo img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }

    .content {
        padding: 1rem;
    }

    h3 {
        margin: 0 0 0.5rem;
    }

    h3 a {
        color: #cc66cc;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    h3 a:hover {
        color: #66cccc;
    }

    .meta {
        display: flex;
        gap: 1rem;
        color: #aaa;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
</style>
