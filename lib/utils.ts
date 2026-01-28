import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createHash } from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Anonymize IP address for privacy compliance (GDPR, CCPA)
 * Removes the last octet of IPv4 addresses
 * Example: 192.168.1.123 -> 192.168.1.0
 */
export function anonymizeIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown'
  
  // IPv4: remove last octet
  if (ip.includes('.')) {
    const parts = ip.split('.')
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`
    }
  }
  
  // IPv6: remove last 64 bits (last 4 groups)
  if (ip.includes(':')) {
    const parts = ip.split(':')
    if (parts.length >= 4) {
      return parts.slice(0, 4).join(':') + '::'
    }
  }
  
  return ip
}

/**
 * Hash IP address for privacy (one-way, cannot be reversed)
 * Uses SHA-256 with a salt for additional security
 */
export function hashIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown'
  
  const salt = process.env.IP_HASH_SALT || 'default-salt-change-in-production'
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .substring(0, 16) // Use first 16 chars for shorter hash
}
