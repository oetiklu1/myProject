<script>
    import StudioCard from "$lib/components/StudioCard.svelte";
    export let data;
</script>

<div class="container my-4">
    <div class="d-flex justify-content-between mb-4">
        <h2>Anime Studios</h2>
        <a href="/studios/create" class="btn btn-primary">Add New Studio</a>
    </div>

    <div class="row g-4">
        {#each data.studios as studio (studio._id)}
            <div class="col-sm-6 col-md-4 col-lg-3">
                <StudioCard {studio} />
            </div>
        {/each}
    </div>
</div>