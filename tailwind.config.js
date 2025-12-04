module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.md',
    './*.html',
    './*.md',
  ],
  theme: {
    extend: {
      colors: {
        // LEGO-inspired color palette (balanced approach)
        'lego-red': '#D01012',
        'lego-yellow': '#FFD700',
        'lego-blue': '#0055BF',
        'lego-green': '#00A550',
        'lego-orange': '#FF6C00',
        // Light tints for backgrounds
        'red-50': '#FEF2F2',
        'yellow-50': '#FFFBEB',
        'blue-50': '#EFF6FF',
        'blue-100': '#DBEAFE',
        'green-50': '#F0FDF4',
        'purple-50': '#FAF5FF',
        // Neutral grays for professional balance
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
        // Additional colors for journey pathway
        'purple-600': '#9333EA',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      height: {
        'logo': '3em',
      },
      maxWidth: {
        'team': '70em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
