<!-- src/lib/components/Footer.svelte -->
<footer class="bg-gray-800 text-white py-6">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="mb-6 md:mb-0">
        <h2 class="text-xl font-bold mb-2">IncubePro</h2>
        <p class="text-gray-300">Conectando desenvolvedores e investidores</p>
      </div>
      
      <div class="grid grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-2">Links</h3>
          <ul class="space-y-1">
            <li><a href="/" class="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="/projects" class="text-gray-300 hover:text-white">Projetos</a></li>
            <li><a href="/about" class="text-gray-300 hover:text-white">Sobre</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Contato</h3>
          <ul class="space-y-1">
            <li><a href="mailto:contato@incubepro.com" class="text-gray-300 hover:text-white">contato@incubepro.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="mt-8 pt-6 border-t border-gray-700 text-center">
      <p class="text-gray-400">&copy; {new Date().getFullYear()} IncubePro. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>