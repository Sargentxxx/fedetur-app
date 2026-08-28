import { createClient } from '@/lib/supabase/client';
import { AuditLog } from '@/types/database';

export const auditService = {
  async logAction(params: {
    userId?: string;
    userEmail?: string;
    action: string;
    entityType: string;
    entityId?: string;
    ipAddress?: string;
    details?: Record<string, any>;
  }): Promise<void> {
    try {
      const supabase = createClient();
      await supabase.from('audit_logs').insert([
        {
          user_id: params.userId,
          action: params.action,
          entity_type: params.entityType,
          entity_id: params.entityId,
          ip_address: params.ipAddress || '127.0.0.1',
          details: params.details || {},
        },
      ]);
    } catch (err) {
      console.log(`[Audit Log] ${params.action} - User: ${params.userEmail || 'Anon'}`, params.details);
    }
  },
};
