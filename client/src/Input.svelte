<script>
    export let type, id, placeholder, value;


    function setType(node) {
        node.type = type;
    }
</script>

<input class="rounded-md focus:ring-2 focus:ring-blue-500 text-center focus:outline-none text-sm leading-6 py-2 mb-2 ring-1 ring-gray-200"
    use:setType {id} {placeholder} bind:value>
<br>