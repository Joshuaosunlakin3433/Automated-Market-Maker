# Quick Styling Update Guide

## Standard Clean Class Patterns (No Dark Mode):

### Form Card Container:
```
className="flex flex-col max-w-md w-full gap-4 p-6 bg-white/95 backdrop-blur border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
```

### Input Fields:
```
className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
```

### Select Dropdowns:
```
className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer font-medium"
```

### Labels:
```
className="font-semibold text-gray-700"
```

### Helper Text:
```
className="text-xs text-gray-500"
```

Find & Replace in all component files:
- `dark:bg-gray-800` → (remove)
- `dark:bg-gray-700` → (remove) 
- `dark:border-gray-600` → (remove)
- `dark:border-gray-700` → (remove)
- `dark:text-white` → (remove)
- `dark:text-gray-300` → (remove)
- `dark:text-gray-400` → (remove)

Then ensure all card backgrounds are: `bg-white/95 backdrop-blur`
